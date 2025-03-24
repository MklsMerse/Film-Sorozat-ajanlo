using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdminWPFApp
{
    public class NewUserDto
    {
        public string FullName { get; set; }
        public string Username { get; set; }  
        public string Email { get; set; }
        public string Password { get; set; }
        public string ProfilePicture { get; set; } 
        public int PermissionId { get; set; }
        public bool Active { get; set; }
    }

}
