using DDDSample1.Domain.Drivers;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Drivers{
    public class DriverRepository : BaseRepository<Driver, DriverId>, IDriverRepository{
    
        public DriverRepository(MDVDbContext context):base(context.Drivers){
        }
    }
}