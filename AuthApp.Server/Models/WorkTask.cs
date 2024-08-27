using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AuthApp.Server.Models
{
    public class WorkTask
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedTime {  get; set; }
        
        public int Status {  get; set; }

        public string? CreatedByUserId {  get; set; }

        public string? AssignedToUserId {  get; set; }
        public bool? IsDeleted { get; set; }


    }
}
