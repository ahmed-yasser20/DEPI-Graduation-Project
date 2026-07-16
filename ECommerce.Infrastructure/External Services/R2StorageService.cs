using Amazon.S3;
using Amazon.S3.Model;
using ECommerce.Application.Interfaces;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerce.Infrastructure.External_Services
{
    public class R2StorageOptions
    {
        public string AccountId { get; set; } = string.Empty;
        public string AccessKey { get; set; } = string.Empty;
        public string SecretKey { get; set; } = string.Empty;
        public string BucketName { get; set; } = string.Empty;
        public string PublicBaseUrl { get; set; } = string.Empty; // e.g. https://pub-xxxx.r2.dev or your custom domain
    }

    public class R2StorageService : IFileStorageService
    {
        private readonly IAmazonS3 _s3Client;
        private readonly R2StorageOptions _options;

        public R2StorageService(IAmazonS3 s3Client, IOptions<R2StorageOptions> options)
        {
            _s3Client = s3Client;
            _options = options.Value;
        }

        public async Task<string> UploadAsync(Stream fileStream, string fileName, string contentType, CancellationToken ct = default)
        {
            var request = new PutObjectRequest
            {
                BucketName = _options.BucketName,
                Key = fileName,
                InputStream = fileStream,
                ContentType = contentType,
                DisablePayloadSigning = true // required for R2 compatibility
            };

            await _s3Client.PutObjectAsync(request, ct);
            return fileName;
        }

        public async Task DeleteAsync(string key, CancellationToken ct = default)
        {
            await _s3Client.DeleteObjectAsync(_options.BucketName, key, ct);
        }

        public string GetPublicUrl(string key)
        {
            return $"{_options.PublicBaseUrl.TrimEnd('/')}/{key}";
        }
    }
}
