using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Vehicles;

namespace DDDSample1.Infrastructure.Vehicles{
    internal class VehicleEntityTypeConfiguration : IEntityTypeConfiguration<Vehicle>{
        
        public void Configure(EntityTypeBuilder<Vehicle> builder){
            builder.HasKey(b => b.Id);
            builder.HasAlternateKey(b => b.LicensePlate);
            builder.HasAlternateKey(b => b.VIN);
            builder.Property(b => b.Id).HasConversion(i => i.AsGuid(), i => new VehicleId(i));
            builder.Property(b => b.VIN).HasMaxLength(17);
            builder.OwnsOne(b => b.Type);
        }
    }
}