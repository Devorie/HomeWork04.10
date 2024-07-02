using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace HomeWork0410.Data
{
    public class PersonRepo
    {
        private readonly string _connectionString;

        public PersonRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }

        public void Add(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void Delete(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
        }

        public void Update(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Update(person);
            context.SaveChanges();
        }

        public void Delete(List<int> ids)
        {
            using var context = new PeopleDataContext(_connectionString);
            var peopleToDelete = context.People.Where(p => ids.Contains(p.Id));
            context.People.RemoveRange(peopleToDelete);
            context.SaveChanges();
        }

    }
}
