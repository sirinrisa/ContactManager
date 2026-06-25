using ContactManager.Data;
using ContactManager.Models;
using Microsoft.AspNetCore.Mvc;

namespace ContactManager.Controllers
{
    public class ContactsController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ContactsController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        [HttpPost]
        public async Task<IActionResult> Create(ContactViewModel model)
        {
            var contact = new Contact
            {
                Name = model.Name,
                MobilePhone = model.MobilePhone,
                JobTitle = model.JobTitle,
                BirthDate = model.BirthDate
            };

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();

            if (model.ImageFile != null)
            {
                var extension = Path.GetExtension(model.ImageFile.FileName);
                var fileName = $"{contact.Id}{extension}";

                var folder = Path.Combine(_env.WebRootPath, "uploads");
                Directory.CreateDirectory(folder);

                var path = Path.Combine(folder, fileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await model.ImageFile.CopyToAsync(stream);
                }

                contact.ImagePath = "/uploads/" + fileName;
                await _context.SaveChangesAsync();
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> Update(ContactViewModel model)
        {
            var contact = await _context.Contacts.FindAsync(model.Id);

            if (contact == null)
                return NotFound();

            contact.Name = model.Name;
            contact.JobTitle = model.JobTitle;
            contact.MobilePhone = model.MobilePhone;
            contact.BirthDate = model.BirthDate;

            if (model.ImageFile != null)
            {
                var extension = Path.GetExtension(model.ImageFile.FileName);
                var fileName = $"{contact.Id}{extension}";

                var folder = Path.Combine(_env.WebRootPath, "uploads");

                Directory.CreateDirectory(folder);

                var path = Path.Combine(folder, fileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await model.ImageFile.CopyToAsync(stream);
                }

                contact.ImagePath = "/uploads/" + fileName;
            }

            await _context.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact != null)
            {
                if (!string.IsNullOrEmpty(contact.ImagePath))
                {
                    var fullPath = Path.Combine(
                        _env.WebRootPath,
                        contact.ImagePath.TrimStart('/')
                    );

                    if (System.IO.File.Exists(fullPath))
                    {
                        System.IO.File.Delete(fullPath);
                    }
                }

                _context.Contacts.Remove(contact);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult DeleteSelected(List<int> ids)
        {
            var contacts = _context.Contacts
                .Where(c => ids.Contains(c.Id))
                .ToList();

            _context.Contacts.RemoveRange(contacts);

            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        public IActionResult Index(string sortOrder, string searchString)
        {
            var contacts = _context.Contacts.AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchString))
            {
                contacts = contacts.Where(c =>
                    c.Name.Contains(searchString) ||
                    c.MobilePhone.Contains(searchString) ||
                    c.JobTitle.Contains(searchString));
            }

            switch (sortOrder)
            {
                case "name":
                    contacts = contacts.OrderBy(c => c.Name);
                    break;

                case "birth":
                    contacts = contacts.OrderBy(c => c.BirthDate);
                    break;

                default:
                    contacts = contacts.OrderBy(c => c.Id);
                    break;
            }

            ViewBag.SearchString = searchString;
            ViewBag.SortOrder = sortOrder;

            return View(contacts.ToList());
        }
    }

}