using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Workblocks{
    
    public interface IWorkblockRepository: IRepository<Workblock,WorkblockId>{
    }
}