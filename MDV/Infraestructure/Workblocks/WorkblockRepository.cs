using DDDSample1.Domain.Workblocks;
using DDDSample1.Infrastructure.Shared;

namespace DDDSample1.Infrastructure.Workblocks{
    public class WorkblockRepository : BaseRepository<Workblock, WorkblockId>, IWorkblockRepository{
    
        public WorkblockRepository(MDVDbContext context):base(context.Workblocks){
        }
    }
}