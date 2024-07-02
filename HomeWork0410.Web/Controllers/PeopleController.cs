using HomeWork0410.Data;
using HomeWork0410.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HomeWork0410.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        public List<Person> GetAll()
        {
            var repo = new PersonRepo(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("add")]
        public void Add(Person person)
        {
            var repo = new PersonRepo(_connectionString);
            repo.Add(person);
        }

        [HttpPost]
        [Route("update")]
        public void Update(Person person)
        {
            var repo = new PersonRepo(_connectionString);
            repo.Update(person);
        }

        [HttpPost]
        [Route("delete")]
        public void Delete(Person p)
        {
            var repo = new PersonRepo(_connectionString);
            repo.Delete(p.Id);
        }

        [HttpPost]
        [Route("deletemany")]
        public void DeleteMany(DeleteViewModel vm)
        {
            var repo = new PersonRepo(_connectionString);
            repo.Delete(vm.Ids);
        }
    }
}
