using DDDSample1.Domain.Vehicles;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Vehicles{
    public class VehicleRepository : BaseRepository<Vehicle, VehicleId>, IVehicleRepository{
    
        public VehicleRepository(MDVDbContext context):base(context.Vehicles){
        }
    }
}