namespace DataAccessLayer.Data.Entity
{
    public class CreateStudentInput
    {
        public string Id { get; set; } = string.Empty;
        public int RollNo { get; set; }
        public string Name { get; set; } = string.Empty;
        public string DateOfBirth { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Course { get; set; } = string.Empty;
        public string Grade { get; set; } = string.Empty;
    }
}
