using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YCodeLab.DB.Resume
{
    [Table("experience", Schema = "resume")]
    public class Experience
    {
        [Column("experience_id "), Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? Id { get; set; }
        [Column("title")]
        public string Title { get; set; }
        [ForeignKey("company_id")]
        public Company Company { get; set; }
        [Column("start_date")]
        public DateTime StartDate { get; set; }
        [Column("end_date")]
        public DateTime? EndDate { get; set; }
        [Column("description", TypeName = "text")]
        public string Description { get; set; }
    }
}
