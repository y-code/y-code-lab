using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YCodeLab.DB.Resume
{
    [Table("profile", Schema = "resume")]
    public class Profile
    {
        [Column("profile_id"), Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? Id { get; set; }
        [Column("first_name")]
        public string FirstName { get; set; }
        [Column("middle_name")]
        public string MiddleName { get; set; }
        [Column("last_name")]
        public string LastName { get; set; }
        [Column("current_title")]
        public string CurrentTitle { get; set; }
        public IEnumerable<Experience> Experiences { get; set; }
    }
}
