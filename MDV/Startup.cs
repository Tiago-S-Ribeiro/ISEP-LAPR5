using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Shared;
using DDDSample1.Domain.Shared;
using DDDSample1.Infrastructure.Drivers;
using DDDSample1.Domain.Drivers;
using DDDSample1.Infrastructure.Vehicles;
using DDDSample1.Domain.Vehicles;
using DDDSample1.Infrastructure.Trips;
using DDDSample1.Domain.Trips;
using DDDSample1.Infrastructure.Workblocks;
using DDDSample1.Domain.Workblocks;
using DDDSample1.Infrastructure.VehicleDuties;
using DDDSample1.Domain.VehicleDuties;
using DDDSample1.Infrastructure.DriverDuties;
using DDDSample1.Domain.DriverDuties;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.HttpsPolicy;

/**
change
**/

namespace DDDSample1{
    public class Startup{
        
        public Startup(IConfiguration configuration){
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services){
            
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>{
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            }));

            services.AddDbContext<MDVDbContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("MDVDatabase"))
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            ConfigureMyServices(services);
            
            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env){
            if (env.IsDevelopment()){
                app.UseDeveloperExceptionPage();
            } else {
                app.UseHsts(); // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            }

            app.UseCors("MyPolicy");

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>{
                endpoints.MapControllers();
            });
            
        }

        public void ConfigureMyServices(IServiceCollection services){
            
            services.AddTransient<IUnitOfWork,UnitOfWork>();
            services.AddTransient<IDriverRepository,DriverRepository>();
            services.AddTransient<IDriverService,DriverService>();
            services.AddTransient<IVehicleRepository,VehicleRepository>();
            services.AddTransient<IVehicleService,VehicleService>();
            services.AddTransient<ITripRepository,TripRepository>();
            services.AddTransient<ITripService,TripService>();
            services.AddTransient<IWorkblockRepository,WorkblockRepository>();
            services.AddTransient<IWorkblockService,WorkblockService>();
            services.AddTransient<IVehicleDutyRepository,VehicleDutyRepository>();
            services.AddTransient<IVehicleDutyService,VehicleDutyService>();
            services.AddTransient<IDriverDutyRepository,DriverDutyRepository>();
            services.AddTransient<IDriverDutyService,DriverDutyService>();
        }
    }
}
