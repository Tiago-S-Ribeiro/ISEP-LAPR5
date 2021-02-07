using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Workblocks;

namespace DDDSample1.Infrastructure.Workblocks{
    internal class WorkblockEntityTypeConfiguration : IEntityTypeConfiguration<Workblock>{
        
        public void Configure(EntityTypeBuilder<Workblock> builder){
            builder.HasKey(b => b.Id);
            builder.HasAlternateKey(b => b.Key);
            builder.Property(b => b.Id).HasConversion(i => i.AsGuid(), i => new WorkblockId(i));
            builder.OwnsMany(b => b.ListOfTrips, trips => {
                trips.WithOwner().HasForeignKey("TripKeyId");
                trips.Property<int>("Id");
                trips.HasKey("Id");
            });
        }
    }
}