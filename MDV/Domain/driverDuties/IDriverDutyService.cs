using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.DriverDuties
{
    public interface IDriverDutyService{

        Task<DriverDutyDto> AddAsync(DriverDutyDto dto);

        Task<DriverDutyDto> GetByIdAsync(DriverDutyId id);

        Task<List<DriverDutyDto>> GetAllAsync();
    }
}