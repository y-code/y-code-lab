using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YCodeLab.DB.Resume
{
    [Table("company", Schema = "resume")]
    public class Company
    {
        [Column("company_id"), Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
    }
}
