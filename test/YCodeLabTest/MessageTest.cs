using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Newtonsoft.Json;
using NUnit.Framework;
using YCodeLab.DB.Messaging;

namespace YCodeLab.Test
{
    [TestFixture]
    class MessageTest
    {
        [Test]
        public void TestValidationAtSenderNameWithNull()
        {
            var message = new Message
            {
                SenderName = null,
            };
            var context = new ValidationContext(message, null, null);
            var results = new List<ValidationResult>();
            var isValid = Validator.TryValidateObject(message, context, results);

            Assert.False(isValid, "The validation should fail.");

            var resultsForSenderName = results.Where(r => r.MemberNames.Contains(nameof(message.SenderName))).ToList();

            Assert.That(resultsForSenderName, Has.One.Matches<ValidationResult>(r => r.ErrorMessage == "Please enter your name."));
            Assert.That(resultsForSenderName, Has.Count.EqualTo(1));
        }

        [Test]
        public void TestValidationAtSenderNameWithEmpty()
        {
            var message = new Message
            {
                SenderName = "",
            };
            var context = new ValidationContext(message, null, null);
            var results = new List<ValidationResult>();
            var isValid = Validator.TryValidateObject(message, context, results);

            Assert.False(isValid, "The validation should fail.");

            var resultsForSenderName = results.Where(r => r.MemberNames.Contains(nameof(message.SenderName))).ToList();

            Assert.That(resultsForSenderName, Has.One.Matches<ValidationResult>(r => r.ErrorMessage == "Please enter your name."));
            Assert.That(resultsForSenderName, Has.Count.EqualTo(1));
        }

        [Test]
        public void TestValidationAtSenderNameWithOnlyFirstName()
        {
            var message = new Message
            {
                SenderName = "yas",
            };
            var context = new ValidationContext(message, null, null);
            var results = new List<ValidationResult>();
            var isValid = Validator.TryValidateObject(message, context, results, true);

            Assert.False(isValid, "The validation should fail.");

            var resultsForSenderName = results.Where(r => r.MemberNames.Contains(nameof(message.SenderName))).ToList();

            Assert.That(resultsForSenderName, Has.One.Matches<ValidationResult>(r => r.ErrorMessage == "Please enter your first name and last name. Optionally, you can include your middle name."),
                $"Actual validation errors: {resultsForSenderName.Select(r => $"* {r.ErrorMessage}").DefaultIfEmpty().Aggregate((a, b) => $"{a}\n{b}")}");
            Assert.That(resultsForSenderName, Has.Count.EqualTo(1));
        }

        [Test]
        public void TestJsonConverter()
        {

        }

        public class ApiResponseStatusJsonConverter : JsonConverter
        {
            public override bool CanConvert(Type objectType)
                => true;

            public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
            {
                if (Enum.TryParse<DateTime>((string)reader.Value, out var result))
                {
                    return result;
                }
                throw new Exception("Invalid value is provided for ApiResponseStatus field in json");
            }

            public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
            {
                writer.WriteValue(value.ToString());
            }
        }
    }
}
