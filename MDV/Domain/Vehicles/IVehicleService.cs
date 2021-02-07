using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Vehicles
{
    public interface IVehicleService{

        Task<VehicleDto> AddAsync(VehicleDto dto);

        Task<VehicleDto> GetByIdAsync(VehicleId id);

        Task<List<VehicleDto>> GetAllAsync();
    }
}