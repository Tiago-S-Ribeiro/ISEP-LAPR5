using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;

namespace DDDSample1.Domain.Trips{
    public class TripService: ITripService{
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITripRepository _repo;

        public TripService(IUnitOfWork unitOfWork, ITripRepository repo){
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<TripDto> AddAsync(TripDto dto){
            
            var trip = TripMapper.toDomain(dto);
            await this._repo.AddAsync(trip);
            await this._unitOfWork.CommitAsync();

            return TripMapper.toDTO(trip);
        }

        public async Task<TripDto> GetByIdAsync(TripId id){
            
            var trip = await this._repo.GetByIdAsync(id);
            if (trip == null){ return null;}
                
            return TripMapper.toDTO(trip);
        }

        public async Task<List<TripDto>> GetAllAsync(){
            var tripsList = await this._repo.GetAllAsync();

            foreach (Trip trip in tripsList) {
                Console.WriteLine("Trip ->" + trip.ToString());
            }
            List<TripDto> listDto = tripsList.ConvertAll<TripDto>(trip => TripMapper.toDTO(trip));
            
            return listDto;
        }
    }
}