using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Workblocks
{
    public interface IWorkblockService{

        Task<WorkblockDto> AddAsync(WorkblockDto dto);

        Task<WorkblockDto> GetByIdAsync(WorkblockId id);

        Task<List<WorkblockDto>> GetAllAsync();
    }
}