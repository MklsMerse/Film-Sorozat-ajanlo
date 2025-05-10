using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdminWPFApp
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LoginNev { get; set; }
        public string Email { get; set; }
        public int PermissionId { get; set; }
        public bool Active { get; set; }
        public string Hash { get; set; } 
        public string Salt { get; set; }
    }
}
