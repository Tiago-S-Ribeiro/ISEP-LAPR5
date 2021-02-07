using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Vehicles{
    public class VehicleService: IVehicleService{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IVehicleRepository _repo;

        public VehicleService(IUnitOfWork unitOfWork, IVehicleRepository repo){
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<VehicleDto> AddAsync(VehicleDto dto){
            
            var vehicle = VehicleMapper.toDomain(dto);
            await this._repo.AddAsync(vehicle);
            await this._unitOfWork.CommitAsync();

            return VehicleMapper.toDTO(vehicle);
        }

        public async Task<VehicleDto> GetByIdAsync(VehicleId id){
            
            var vehicle = await this._repo.GetByIdAsync(id);
            if (vehicle == null){
                return null;
            }
                
            return VehicleMapper.toDTO(vehicle);
        }

        public async Task<List<VehicleDto>> GetAllAsync(){
            var list = await this._repo.GetAllAsync();

            List<VehicleDto> listDto = list.ConvertAll<VehicleDto>(vehicle => VehicleMapper.toDTO(vehicle));
            
            return listDto;
        }
    }
}