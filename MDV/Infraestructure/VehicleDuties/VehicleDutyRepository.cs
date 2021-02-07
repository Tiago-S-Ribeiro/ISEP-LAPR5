using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.VehicleDuties{
    public class VehicleDutyRepository : BaseRepository<VehicleDuty, VehicleDutyId>, IVehicleDutyRepository{
    
        public VehicleDutyRepository(MDVDbContext context):base(context.VehicleDuties){
        }
    }
}