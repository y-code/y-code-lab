using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YCodeLab.DB.Messaging
{
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
}
