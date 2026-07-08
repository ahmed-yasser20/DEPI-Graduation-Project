using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECommerce.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateOrdersPaymentAndOrderProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Customer_AppUserId",
                table: "Payment");

            migrationBuilder.DropIndex(
                name: "IX_Payment_AppUserId",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "PayId",
                table: "Order");

            migrationBuilder.AddColumn<decimal>(
                name: "UnitPrice",
                table: "Order_Products",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UnitPrice",
                table: "Order_Products");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Payment",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PayId",
                table: "Order",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Payment_AppUserId",
                table: "Payment",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Customer_AppUserId",
                table: "Payment",
                column: "AppUserId",
                principalTable: "Customer",
                principalColumn: "Id");
        }
    }
}
