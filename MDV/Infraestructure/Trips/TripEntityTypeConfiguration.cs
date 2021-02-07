using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Trips;

namespace DDDSample1.Infrastructure.Trips{
    internal class TripEntityTypeConfiguration : IEntityTypeConfiguration<Trip>{
        
        public void Configure(EntityTypeBuilder<Trip> builder){
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasConversion(i => i.AsGuid(), i => new TripId(i));
            builder.OwnsMany(b => b.PassingTimes, passingTimes => {
                passingTimes.WithOwner().HasForeignKey("PassingTimeId");
                passingTimes.Property<int>("Id");
                passingTimes.HasKey("Id");
            });
        }
    }
}