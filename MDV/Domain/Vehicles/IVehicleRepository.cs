using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Vehicles{
    
    public interface IVehicleRepository: IRepository<Vehicle,VehicleId>{
    }
}