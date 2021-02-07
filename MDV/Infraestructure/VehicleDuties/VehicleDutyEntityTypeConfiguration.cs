using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.VehicleDuties;

namespace DDDSample1.Infrastructure.VehicleDuties{
    internal class VehicleDutyEntityTypeConfiguration : IEntityTypeConfiguration<VehicleDuty>{
        
        public void Configure(EntityTypeBuilder<VehicleDuty> builder){
            builder.HasKey(b => b.Id);
            builder.HasAlternateKey(b => b.Key);
            builder.Property(b => b.Id).HasConversion(i => i.AsGuid(), i => new VehicleDutyId(i));
            builder.OwnsMany(b => b.Trips, trips => {
                trips.WithOwner().HasForeignKey("VDTripKey");
                trips.Property<int>("Id");
                trips.HasKey("Id");
            });
            builder.OwnsMany(b => b.Workblocks, workblocks => {
                workblocks.WithOwner().HasForeignKey("VDWorkblockKey");
                workblocks.Property<int>("Id");
                workblocks.HasKey("Id");
            });
        }
    }
}