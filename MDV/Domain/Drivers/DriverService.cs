using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;

namespace DDDSample1.Domain.Drivers{
    public class DriverService: IDriverService{
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDriverRepository _repo;

        public DriverService(IUnitOfWork unitOfWork, IDriverRepository repo){
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<DriverDto> AddAsync(DriverDto dto){
            
            var driver = DriverMapper.toDomain(dto);
            await this._repo.AddAsync(driver);
            await this._unitOfWork.CommitAsync();

            return DriverMapper.toDTO(driver);
        }

        public async Task<DriverDto> GetByIdAsync(DriverId id){
            
            var driver = await this._repo.GetByIdAsync(id);
            if (driver == null){
                return null;
            }
                
            return DriverMapper.toDTO(driver);
        }

        public async Task<List<DriverDto>> GetAllAsync(){
            var list = await this._repo.GetAllAsync();

            foreach (Driver d in list) {
                Console.WriteLine("hh:" + d.ToString());
            }
            List<DriverDto> listDto = list.ConvertAll<DriverDto>(driver => DriverMapper.toDTO(driver));
            
            return listDto;
        }
    }
}