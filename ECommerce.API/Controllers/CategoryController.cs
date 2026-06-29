using ECommerce.Application.DTOs;
using ECommerce.Application.Interfaces;
using ECommerce.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CategoryController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<CategoryResponseDto>>> GetAll()
        {
            var categories = await _unitOfWork.Categories.GetAllWithProductsAsync();

            var result = categories.Select(c => new CategoryResponseDto
            {
                CategoryId = c.CategoryId,
                Category_Name = c.Category_Name,
                ProductCount = c.Products.Count()
            });

            return Ok(result);
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<CategoryResponseDto>> GetById(int id)
        {
            var category = await _unitOfWork.Categories.GetByIdAsync(id);
            if (category is null)
                return NotFound(new { message = $"Category with ID {id} was not found." });

            var result = new CategoryResponseDto
            {
                CategoryId = category.CategoryId,
                Category_Name = category.Category_Name
            };

            return Ok(result);
        }

        [HttpGet("{id:int}/products")]
        [AllowAnonymous]
        public async Task<ActionResult<CategoryWithProductsDto>> GetWithProducts(int id)
        {
            var categories = await _unitOfWork.Categories.GetAllWithProductsAsync();
            var category = categories.FirstOrDefault(c => c.CategoryId == id);

            if (category is null)
                return NotFound(new { message = $"Category with ID {id} was not found." });

            var result = new CategoryWithProductsDto
            {
                CategoryId = category.CategoryId,
                Category_Name = category.Category_Name,
                Products = category.Products.Select(p => new CategoryProductItemDto
                {
                    PId = p.PId,
                    PName = p.PName,
                    Price = p.Price,
                    Stock = p.Stock
                })
            };

            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CategoryResponseDto>> Create([FromBody] CreateCategoryDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var exists = await _unitOfWork.Categories.ExistsAsync(c => c.Category_Name == dto.Category_Name);
            if (exists)
                return Conflict(new { message = $"A category named '{dto.Category_Name}' already exists." });

            var category = new Category
            {
                Category_Name = dto.Category_Name
            };

            await _unitOfWork.Categories.AddAsync(category);
            await _unitOfWork.SaveChangesAsync();

            var result = new CategoryResponseDto
            {
                CategoryId = category.CategoryId,
                Category_Name = category.Category_Name
            };

            return CreatedAtAction(nameof(GetById), new { id = category.CategoryId }, result);
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CategoryResponseDto>> Update(int id, [FromBody] UpdateCategoryDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var category = await _unitOfWork.Categories.GetByIdAsync(id);
            if (category is null)
                return NotFound(new { message = $"Category with ID {id} was not found." });

            var nameConflict = await _unitOfWork.Categories.ExistsAsync(
                c => c.Category_Name == dto.Category_Name && c.CategoryId != id);

            if (nameConflict)
                return Conflict(new { message = $"Another category with name '{dto.Category_Name}' already exists." });

            category.Category_Name = dto.Category_Name;
            _unitOfWork.Categories.Update(category);
            await _unitOfWork.SaveChangesAsync();

            var result = new CategoryResponseDto
            {
                CategoryId = category.CategoryId,
                Category_Name = category.Category_Name
            };

            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _unitOfWork.Categories.GetByIdAsync(id);
            if (category is null)
                return NotFound(new { message = $"Category with ID {id} was not found." });

            _unitOfWork.Categories.Delete(category);
            await _unitOfWork.SaveChangesAsync();

            return NoContent();
        }
    }
}
