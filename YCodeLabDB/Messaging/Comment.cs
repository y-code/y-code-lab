using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace YCodeLab.DB.Messaging;

[Table("comment", Schema = "messaging")]
public class Comment
{
    [Column("comment_id"), Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long? Id { get; set; }
    [Column("category")]
    public string category { get; set; }
    [Column("content")]
    public string content { get; set; }
}

internal class CommentEntityConfig : IEntityTypeConfiguration<Comment>
{
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        builder.HasIndex(e => e.category);
    }
}
