using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace DDDSample1.Domain.Trips
{
    public interface ITripService{

        Task<TripDto> AddAsync(TripDto dto);

        Task<TripDto> GetByIdAsync(TripId id);

        Task<List<TripDto>> GetAllAsync();
    }
}