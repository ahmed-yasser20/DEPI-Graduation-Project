using ECommerce.Application.DTOs;
using ECommerce.Application.Exceptions;
using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IFileStorageService _fileStorageService;
        private readonly IRatingRepository _ratingRepository; // NEW

        private static readonly HashSet<string> AllowedContentTypes = new(StringComparer.OrdinalIgnoreCase)
        {
        "image/jpeg", "image/png", "image/webp"
        };
        private const long MaxFileSizeBytes = 5 * 1024 * 1024; // 5MB

        public ProductService(
            IProductRepository productRepository,
            IFileStorageService fileStorageService,
            IRatingRepository ratingRepository) // NEW
        {
            _productRepository = productRepository;
            _fileStorageService = fileStorageService;
            _ratingRepository = ratingRepository;
        }

        public async Task<IEnumerable<ProductResponseDto>> GetAllAsync()
        {
            var products = await _productRepository.GetAllAsync();
            return await MapManyToDtoAsync(products);
        }

        public async Task<ProductResponseDto> GetByIdAsync(int id)
        {
            var product = await _productRepository.GetWithCategoryAsync(id);
            if (product is null)
                throw new NotFoundException($"Product with ID {id} was not found.");

            var (avg, count) = await _ratingRepository.GetSummaryAsync(id);
            return MapToDto(product, avg, count);
        }

        public async Task<IEnumerable<ProductResponseDto>> GetByCategoryAsync(int categoryId)
        {
            var products = await _productRepository.GetByCategoryAsync(categoryId);
            return await MapManyToDtoAsync(products);
        }

        public async Task<IEnumerable<ProductResponseDto>> GetInStockAsync()
        {
            var products = await _productRepository.GetInStockAsync();
            return await MapManyToDtoAsync(products);
        }

        public async Task<IEnumerable<ProductResponseDto>> SearchByNameAsync(string keyword)
        {
            var products = await _productRepository.SearchByNameAsync(keyword);
            return await MapManyToDtoAsync(products);
        }

        public async Task<ProductResponseDto> CreateAsync(CreateProductDto dto)
        {
            var product = new Product
            {
                PName = dto.PName,
                Price = dto.Price,
                Description = dto.Description,
                Stock = dto.Stock,
                CategoryId = dto.CategoryId
            };

            await _productRepository.AddAsync(product);
            await _productRepository.SaveChangesAsync();

            // brand-new product, no ratings yet
            return MapToDto(product, 0, 0);
        }

        public async Task<ProductResponseDto> UpdateAsync(int id, UpdateProductDto dto)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product is null)
                throw new NotFoundException($"Product with ID {id} was not found.");

            product.PName = dto.PName;
            product.Price = dto.Price;
            product.Description = dto.Description;
            product.Stock = dto.Stock;
            product.CategoryId = dto.CategoryId;

            _productRepository.Update(product);
            await _productRepository.SaveChangesAsync();

            var (avg, count) = await _ratingRepository.GetSummaryAsync(id);
            return MapToDto(product, avg, count);
        }

        public async Task DeleteAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product is null)
                throw new NotFoundException($"Product with ID {id} was not found.");

            _productRepository.Delete(product);
            await _productRepository.SaveChangesAsync();
        }

        public async Task<ProductResponseDto> UploadImageAsync(int id, Stream fileStream, string fileName, string contentType, long fileLength)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product is null)
                throw new NotFoundException($"Product with ID {id} was not found.");

            if (!AllowedContentTypes.Contains(contentType))
                throw new BadRequestException("Only JPEG, PNG, and WEBP images are allowed.");

            if (fileLength > MaxFileSizeBytes)
                throw new BadRequestException("Image must be 5MB or smaller.");

            var oldKey = product.ImageKey;

            var extension = Path.GetExtension(fileName);
            var newKey = $"products/{Guid.NewGuid()}{extension}";

            var uploadedKey = await _fileStorageService.UploadAsync(fileStream, newKey, contentType);

            product.ImageKey = uploadedKey;
            _productRepository.Update(product);
            await _productRepository.SaveChangesAsync();

            if (!string.IsNullOrEmpty(oldKey))
                await _fileStorageService.DeleteAsync(oldKey);

            var (avg, count) = await _ratingRepository.GetSummaryAsync(id);
            return MapToDto(product, avg, count);
        }

        public async Task<ProductResponseDto> DeleteImageAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product is null)
                throw new NotFoundException($"Product with ID {id} was not found.");

            if (!string.IsNullOrEmpty(product.ImageKey))
            {
                await _fileStorageService.DeleteAsync(product.ImageKey);
                product.ImageKey = null;
                _productRepository.Update(product);
                await _productRepository.SaveChangesAsync();
            }

            var (avg, count) = await _ratingRepository.GetSummaryAsync(id);
            return MapToDto(product, avg, count);
        }

        private async Task<IEnumerable<ProductResponseDto>> MapManyToDtoAsync(IEnumerable<Product> products)
        {
            var productList = products.ToList();
            var summaries = await _ratingRepository.GetSummariesAsync(productList.Select(p => p.PId));

            return productList.Select(p =>
            {
                var (avg, count) = summaries.TryGetValue(p.PId, out var s) ? s : (0, 0);
                return MapToDto(p, avg, count);
            });
        }

        private ProductResponseDto MapToDto(Product product, double averageRating, int ratingCount)
        {
            return new ProductResponseDto
            {
                PId = product.PId,
                PName = product.PName,
                Price = product.Price,
                Description = product.Description,
                Stock = product.Stock,
                CategoryId = product.CategoryId,
                Category_Name = product.Category?.Category_Name,
                AverageRating = averageRating,
                RatingCount = ratingCount,
                ImageUrl = string.IsNullOrEmpty(product.ImageKey)
                    ? null
                    : _fileStorageService.GetPublicUrl(product.ImageKey)
            };
        }
    }
}
