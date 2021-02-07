using DDDSample1.Domain.Trips;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Trips{
    public class TripRepository : BaseRepository<Trip, TripId>, ITripRepository{
    
        public TripRepository(MDVDbContext context):base(context.Trips){
        }
    }
}