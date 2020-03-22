using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace YCodeLab.DB.Migrations
{
    public partial class v0_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "messaging");

            migrationBuilder.EnsureSchema(
                name: "resume");

            migrationBuilder.CreateTable(
                name: "comment",
                schema: "messaging",
                columns: table => new
                {
                    comment_id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    category = table.Column<string>(nullable: true),
                    content = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_comment", x => x.comment_id);
                });

            migrationBuilder.CreateTable(
                name: "message",
                schema: "messaging",
                columns: table => new
                {
                    message_id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    sender_name = table.Column<string>(nullable: false),
                    sender_email = table.Column<string>(nullable: false),
                    content = table.Column<string>(maxLength: 10, nullable: false),
                    created_time = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_message", x => x.message_id);
                });

            migrationBuilder.CreateTable(
                name: "company",
                schema: "resume",
                columns: table => new
                {
                    company_id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_company", x => x.company_id);
                });

            migrationBuilder.CreateTable(
                name: "profile",
                schema: "resume",
                columns: table => new
                {
                    profile_id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    first_name = table.Column<string>(nullable: true),
                    middle_name = table.Column<string>(nullable: true),
                    last_name = table.Column<string>(nullable: true),
                    current_title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_profile", x => x.profile_id);
                });

            migrationBuilder.CreateTable(
                name: "experience",
                schema: "resume",
                columns: table => new
                {
                    experience_id = table.Column<long>(name: "experience_id ", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    title = table.Column<string>(nullable: true),
                    company_id = table.Column<long>(nullable: true),
                    start_date = table.Column<DateTime>(nullable: false),
                    end_date = table.Column<DateTime>(nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    ProfileId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_experience", x => x.experience_id);
                    table.ForeignKey(
                        name: "FK_experience_profile_ProfileId",
                        column: x => x.ProfileId,
                        principalSchema: "resume",
                        principalTable: "profile",
                        principalColumn: "profile_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_experience_company_company_id",
                        column: x => x.company_id,
                        principalSchema: "resume",
                        principalTable: "company",
                        principalColumn: "company_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_comment_category",
                schema: "messaging",
                table: "comment",
                column: "category");

            migrationBuilder.CreateIndex(
                name: "IX_experience_ProfileId",
                schema: "resume",
                table: "experience",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_experience_company_id",
                schema: "resume",
                table: "experience",
                column: "company_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "comment",
                schema: "messaging");

            migrationBuilder.DropTable(
                name: "message",
                schema: "messaging");

            migrationBuilder.DropTable(
                name: "experience",
                schema: "resume");

            migrationBuilder.DropTable(
                name: "profile",
                schema: "resume");

            migrationBuilder.DropTable(
                name: "company",
                schema: "resume");
        }
    }
}
