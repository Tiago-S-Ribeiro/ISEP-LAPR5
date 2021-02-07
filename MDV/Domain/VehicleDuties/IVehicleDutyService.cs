using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.VehicleDuties
{
    public interface IVehicleDutyService{

        Task<VehicleDutyDto> AddAsync(VehicleDutyDto dto);

        Task<VehicleDutyDto> GetByIdAsync(VehicleDutyId id);

        Task<List<VehicleDutyDto>> GetAllAsync();
    }
}