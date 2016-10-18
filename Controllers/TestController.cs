﻿using IMS.Core;
using IMS.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IMS.Controllers
{
    public class TestController : ApiController
    {
        private AbDataContext db = new AbDataContext();
        // GET: api/Test
        public IEnumerable<personDes> Get()
        {
            //return new string[] { "value1", "value2" };
            return db.personDetails.Include("contact_detail").AsEnumerable();
        }

        // GET: api/Test/5
        public personDes Get(string id)
        {
            int no = Convert.ToInt32(id);
            var byId = db.personDetails.Include("contact_detail").Where(x => x.person_id == no).FirstOrDefault();
            return byId;
        }

        // POST: api/Test
        public HttpResponseMessage Post(personDes person)
        {
            if(person != null)
            {
                var checkName = db.personDetails.Where(x => x.name == person.name).Count();
                if (checkName > 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "The account with this name is already exist!"); ;
                }
                else
                {
                    db.personDetails.Add(person);
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, "Added!"); ;
                }
            }
            else
            {
                var message = "error";
                return Request.CreateResponse(HttpStatusCode.NotFound, message); ;
            }
        }

        // PUT: api/Test/5
        public void Put(int id, [FromBody]string value)
        {
            //db.personDetails.Attach();
        }

        // DELETE: api/Test/5
        [Route("api/Test/delete/{id}")]
        [HttpPost]
        public string Delete(personDes person)
        {
            int no = Convert.ToInt32(person.person_id);
            var record = db.personDetails.Include("contact_detail").Where(x => x.person_id == no).FirstOrDefault();
            db.personDetails.Remove(record);
            db.SaveChanges();
            return "Deleted";
        }
    }
}
