using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Drivers
{
    public interface IDriverService{

        Task<DriverDto> AddAsync(DriverDto dto);

        Task<DriverDto> GetByIdAsync(DriverId id);

        Task<List<DriverDto>> GetAllAsync();
    }
}