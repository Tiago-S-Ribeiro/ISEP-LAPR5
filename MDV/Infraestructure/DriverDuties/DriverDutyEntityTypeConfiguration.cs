using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.DriverDuties;

namespace DDDSample1.Infrastructure.DriverDuties{
    internal class DriverDutyEntityTypeConfiguration : IEntityTypeConfiguration<DriverDuty>{
        
        public void Configure(EntityTypeBuilder<DriverDuty> builder){
            builder.HasKey(b => b.Id);
            builder.HasAlternateKey(b => b.Key);
            builder.Property(b => b.Id).HasConversion(i => i.AsGuid(), i => new DriverDutyId(i));
            builder.OwnsMany(b => b.Workblocks, workblocks => {
                workblocks.WithOwner().HasForeignKey("DriverWorkblock");
                workblocks.Property<int>("Id");
                workblocks.HasKey("Id");
            });
        }
    }
}