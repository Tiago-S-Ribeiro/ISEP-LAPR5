using DDDSample1.Domain.DriverDuties;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.DriverDuties{
    public class DriverDutyRepository : BaseRepository<DriverDuty, DriverDutyId>, IDriverDutyRepository{
    
        public DriverDutyRepository(MDVDbContext context):base(context.DriverDuties){
        }
    }
}