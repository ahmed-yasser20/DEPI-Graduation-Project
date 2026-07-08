using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECommerce.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class payment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Payment_PayId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Customer_CId",
                table: "Payment");

            migrationBuilder.DropIndex(
                name: "IX_Payment_CId",
                table: "Payment");

            migrationBuilder.DropIndex(
                name: "IX_Order_PayId",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "CId",
                table: "Payment");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Payment",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Payment",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Created_At",
                table: "Payment",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "FailureReason",
                table: "Payment",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OId",
                table: "Payment",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Paid_At",
                table: "Payment",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StripePaymentIntentId",
                table: "Payment",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_AppUserId",
                table: "Payment",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_OId",
                table: "Payment",
                column: "OId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Payment_StripePaymentIntentId",
                table: "Payment",
                column: "StripePaymentIntentId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Customer_AppUserId",
                table: "Payment",
                column: "AppUserId",
                principalTable: "Customer",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Order_OId",
                table: "Payment",
                column: "OId",
                principalTable: "Order",
                principalColumn: "OId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Customer_AppUserId",
                table: "Payment");

            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Order_OId",
                table: "Payment");

            migrationBuilder.DropIndex(
                name: "IX_Payment_AppUserId",
                table: "Payment");

            migrationBuilder.DropIndex(
                name: "IX_Payment_OId",
                table: "Payment");

            migrationBuilder.DropIndex(
                name: "IX_Payment_StripePaymentIntentId",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "Created_At",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "FailureReason",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "OId",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "Paid_At",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "StripePaymentIntentId",
                table: "Payment");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Payment",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AddColumn<string>(
                name: "CId",
                table: "Payment",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_CId",
                table: "Payment",
                column: "CId");

            migrationBuilder.CreateIndex(
                name: "IX_Order_PayId",
                table: "Order",
                column: "PayId");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Payment_PayId",
                table: "Order",
                column: "PayId",
                principalTable: "Payment",
                principalColumn: "PayId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Customer_CId",
                table: "Payment",
                column: "CId",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
