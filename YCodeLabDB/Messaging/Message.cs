using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace YCodeLab.DB.Messaging
{
    [Table("message", Schema = "messaging")]
    public class Message : IValidatableObject
    {
        [Column("message_id"), Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? Id { get; set; }
        [Column("sender_name")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter your name.")]
        [FullName(ErrorMessage = "Please enter your first name and last name. Optionally, you can include your middle name.")]
        public string SenderName { get; set; }
        [Column("sender_email")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter your email address.")]
        [EmailAddress(ErrorMessage = "This email address looks not valid. Please check your email address.")]
        public string SenderEmail { get; set; }
        [Column("content")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "Please enter some message.")]
        [MaxLength(10, ErrorMessage = "Your message is too long. Please input 1000 characters or less.")]
        public string Content { get; set; }
        [Column("created_time")]
        public DateTime? CreatedTime { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (CreatedTime.HasValue)
                yield return new ValidationResult("Please do not set created time. This field is only set by system.", new[] { nameof(Content) });
        }
    }
}

public class FullNameAttribute : ValidationAttribute
{
    const string __patternAllowedChar = @"[^~!@#\$%\^&\*\(\)_\+\{\}\\\|:""<>\?\-=\[\]\;',\./\s]";
    private Regex _patternName = new Regex($@"^{__patternAllowedChar}{{1,100}}\s{__patternAllowedChar}{{1,100}}(\s{__patternAllowedChar}{{1,100}})?$");

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value is string && !_patternName.IsMatch((string)value))
            return new ValidationResult(FormatErrorMessage(validationContext.DisplayName));
        return null;
    }
}
