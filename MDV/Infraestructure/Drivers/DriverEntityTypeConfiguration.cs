using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Drivers;

namespace DDDSample1.Infrastructure.Drivers{
    internal class DriverEntityTypeConfiguration : IEntityTypeConfiguration<Driver>{
        
        public void Configure(EntityTypeBuilder<Driver> builder){
            builder.HasKey(b => b.Id);
            builder.HasAlternateKey(b => b.MechanographicNumber);
            builder.HasAlternateKey(b => b.CitizenCardNumber);
            builder.HasAlternateKey(b => b.NIF);
            builder.HasAlternateKey(b => b.DrivingLicenseNumber);
            builder.Property(b => b.Id).HasConversion(i => i.AsGuid(), i => new DriverId(i));
            builder.Property(b => b.MechanographicNumber).HasMaxLength(9);
            builder.Property(b => b.CitizenCardNumber).HasMaxLength(8);
            builder.Property(b => b.NIF).HasMaxLength(9);
            builder.Property(b => b.DrivingLicenseNumber).HasMaxLength(9);
            builder.OwnsMany(b => b.DriverTypes, dt => {
                dt.WithOwner().HasForeignKey("DriverTypeId");
                dt.Property<int>("Id");
                dt.HasKey("Id");
            });
        }
    }
}