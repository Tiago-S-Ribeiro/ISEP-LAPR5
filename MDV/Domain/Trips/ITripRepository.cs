using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Trips{
    
    public interface ITripRepository: IRepository<Trip,TripId>{
    }
}