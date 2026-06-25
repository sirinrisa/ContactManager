namespace ContactManager.Models
{
    public class ContactViewModel
    {
        public string Name { get; set; }
        public string MobilePhone { get; set; }
        public string JobTitle { get; set; }
        public DateTime BirthDate { get; set; }

        public IFormFile ImageFile { get; set; }

        public int Id { get; set; }
    }
}
