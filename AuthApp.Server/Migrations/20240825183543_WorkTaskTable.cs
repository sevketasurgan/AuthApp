using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class WorkTaskTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssignedToUserId",
                table: "WorkTasks",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CreatedByUserId",
                table: "WorkTasks",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedTime",
                table: "WorkTasks",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "WorkTasks",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "WorkTasks",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssignedToUserId",
                table: "WorkTasks");

            migrationBuilder.DropColumn(
                name: "CreatedByUserId",
                table: "WorkTasks");

            migrationBuilder.DropColumn(
                name: "CreatedTime",
                table: "WorkTasks");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "WorkTasks");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "WorkTasks");
        }
    }
}
