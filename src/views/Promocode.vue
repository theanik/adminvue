<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
          
           
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                      <div class="card shadow"
                            :class="type === 'dark' ? 'bg-default': ''">
                          <div class="card-header border-0"
                              :class="type === 'dark' ? 'bg-transparent': ''">
                            <div class="row align-items-center">
                              <div class="col">
                                <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                                
                                </h3>
                              </div>
                              <div class="col text-right">
                                
                                 <b-button @click.prevent="create" class="btn btn-success">ADD NEW PROMOCODE</b-button>
                              </div>
                            </div>
                          </div>

                              <div class="table-responsive">
                                <base-table class="table align-items-center table-flush"
                                            :class="type === 'dark' ? 'table-dark': ''"
                                            :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                                            tbody-classes="list"
                                            :data="tableData">
                                  <template slot="columns">
                                    <th>Promo Code</th>
                                    <th>Region</th>
                                    <th>Vehicle </th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                  </template>

                                  <template slot-scope="{row}">
                                    
                                    <td class="budget">
                                      {{ row.promoCode}}
                                    </td>
                                    <td>
                                      {{ row.regionId }}
                                    </td>
                                    <td>
                                      {{ row.vehicleType }}
                                    </td>
                                    <td>
                                      {{ row.stratDate | mydate}}
                                    </td>
                                    <td>
                                      {{ row.endDate | mydate}}
                                    </td>
                                    <td>
                                      {{ row.offerAmount }}
                                    </td>
                                  

                                    <td class="text-right">
                                      <b-button @click.prevent="show(row)" class="btn btn-info btn-sm"><i class="fa fa-eye"></i></b-button>
                                       <b-button @click.prevent="edit(row)" class="btn btn-primary btn-sm"><i class="fa fa-edit"></i></b-button>
                                      <b-button v-if="row.status == 1" @click.prevent="block(row)" class="btn btn-success btn-sm"><i class="fa fa-check" aria-hidden="true"></i></b-button>
                                      <b-button v-if="row.status == 0" @click.prevent="approve(row)" class="btn btn-danger btn-sm"><i class="fas fa-ban" aria-hidden="true"></i></b-button>
                                      <b-button @click.prevent="destroy(row)" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></b-button>
                                    </td>

                                  </template>

                                </base-table>
                              </div>

                          <div class="card-footer d-flex justify-content-end"
                              :class="type === 'dark' ? 'bg-transparent': ''">
                            <base-pagination total="{row}"></base-pagination>
                          </div>

                        </div>
                </div>
            </div>


            <!-- Modal -->
          <b-modal ref="modal" hide-footer :title="modalTitle">
              <div class="d-block">
                <b-form  @submit.prevent="editMode ? update() : storeData()" method="post">
                    <alert-error :form="form" message="There were some problems with your input."></alert-error>
                <b-form-group label="Enter Promocode" >
                    <b-form-input v-model="form.promoCode" type="text" required placeholder="Enter Name" ></b-form-input>
                  </b-form-group>

                  <b-form-group label="Enter Region" >
                         <select v-model="form.regionId" n
                            class="form-control">
                            <option v-for="region in regions" :key="region.id" v-bind:value="region.id">{{region.regionName}}</option>
                            
                            <!-- <option v-for="region in regions" :key="region.id" v-bind:value="region.regionName">{{ category.name}}</option> -->
                        </select>
                  </b-form-group>

                  <b-form-group label="Enter Vehicle" >
                         <select v-model="form.vehicleType" n
                            class="form-control">
                            <option v-for="vehicle in vehicles" :key="vehicle.id" v-bind:value="vehicle.vehicleType">{{vehicle.vehicleType}}</option>
                            
                            <!-- <option v-for="region in regions" :key="region.id" v-bind:value="region.regionName">{{ category.name}}</option> -->
                        </select>
                  </b-form-group>

                  <b-form-group label="Enter start Date" >
                    <b-form-input v-model="form.stratDate" type="date" required placeholder="Enter Name" ></b-form-input>
                  </b-form-group>
                  <b-form-group label="Enter End Date" >
                    <b-form-input v-model="form.endDate" type="date" required placeholder="Enter Name" ></b-form-input>
                  </b-form-group>
                  <b-form-group label="Enter Anount" >
                    <b-form-input v-model="form.offerAmount" type="text" required placeholder="Enter Name" ></b-form-input>
                  </b-form-group>
                  
                  <b-button type="submit" variant="primary">Submit</b-button>
                  <b-button type="reset" variant="danger">Reset</b-button>
                </b-form>
              </div>
              
            </b-modal>

             <!-- show modal -->
            <b-modal ref="my-modal2" hide-footer :title="modalTitle">
            <div class="d-block">
              <b-list-group>
                <b-list-group-item><strong>promoCode</strong> : {{ showDetais.promoCode }}</b-list-group-item>
                <b-list-group-item><strong>regionId</strong> : {{ showDetais.regionId }}</b-list-group-item>
                <b-list-group-item><strong>vehicleType</strong> : {{ showDetais.vehicleType }}</b-list-group-item>
                <b-list-group-item><strong>stratDate</strong> : {{ showDetais.stratDate }}</b-list-group-item>
                <b-list-group-item><strong>endDate</strong> : {{ showDetais.endDate }}</b-list-group-item>
                <b-list-group-item><strong>Offer Amount</strong> : {{ showDetais.offerAmount }}</b-list-group-item>
                
               
              </b-list-group>
            </div>
          </b-modal>
          <!-- end show modal -->

        </div>

    </div>
</template>
<script>
  import ProjectsTable from './Tables/ProjectsTable'
  import values from '../value'
  export default {
    data(){
      return{
         
        editMode : false,
        tableData: [],
        regions: [],
        vehicles :[],
        modalTitle : '',
        showDetais : {},
        showMode : false,
        selected: null,
        form : new Form({
            id : '',
            promoCode:'',
            regionId:'',
            vehicleType:'',
            stratDate:'',
            endDate:'',
            offerAmount:''
          }),
      }
    },
    mounted(){
      if(!localStorage.getItem('auth-token')){
            this.$router.replace(this.$route.query.redirect || '/login')
        }
      console.log('promocode mounted')
      this.getData();
      this.getVehicle()
      this.getRegion()
    //   var d =  JSON.stringify(this.regions);
    //   var re = JSON.parse(d);
    //   console.log(re)
    //   for(var e in this.regions){
    //         console.log(e.regionName)
    //     }
    },
    name: 'tables',
    components: {
      ProjectsTable
    },
    methods :{
      onFileSelected(event){
        console.log(event)
        this.selectedFile = event.target.files[0]
      },
      create(){
        this.editMode = false,
        this.modalTitle = "ADD REGION"
        this.form.reset()
        this.$refs['modal'].show()
        // console.log(this.regions)
        console.log(typeof(this.regions))
        for(var e in this.regions){
            console.log()
        }
        console.log('ffffffffffffffffffffffffff')
      },getData(){
        this.axios.get(`${values.BASE_URL}/admin_api/v1/promocode_all`,
        {headers:{'auth-token':localStorage.getItem('auth-token')}})
          .then(res=>{
            console.log(res.data)
            this.tableData = res.data
          }).catch(e=>{
            console.log(e)
          })
      },
      getVehicle(){
          this.axios.get(`${values.BASE_URL}/admin_api/v1/get_all_vehicle_type`,
            {headers:{'auth-token':localStorage.getItem('auth-token')}})
            .then(res=>{
                // console.log(res.data.AllVehicleData)
                this.vehicles = res.data.AllVehicleData
            }).catch(e=>{
                console.log(e)
            })
      },
    getRegion(){
            this.axios.get(`${values.BASE_URL}/admin_api/v1/all_region`,
            {headers:{'auth-token':localStorage.getItem('auth-token')}})
            .then(res=>{
                // console.log(res.data)
                this.regions = res.data.regionData
            }).catch(e=>{
                console.log(e)
            })
    },
      storeData(){
        //   console.log(this.form)
        this.form.post(`${values.BASE_URL}/admin_api/v1/add_promocode`,{
          headers:{'auth-token':localStorage.getItem('auth-token')}
        }).then(res=>{
          this.getData()
          if(this.form.successful == true){
                this.form.clear()
                this.$refs['modal'].hide()
                this.$snotify.success('Vehicle Add Successfully','Success')
            }else{
                this.$snotify.error('Something wend wrong. Try aging','Error')
            }
        }).catch(e=>{
          this.$snotify.error('Something went wrong..try again','Error')
            console.log(e)
        })

    },
    destroy(row){
          this.$snotify.clear()
          this.$snotify.confirm("You will not be able to recover this data!","Are you sure?", {
                  showProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  buttons:[
                      {
                          text : "Yes",
                          action : toast => {
                              this.$snotify.remove(toast.id)
                            //   this.axios.delete(`${values.BASE_URL}/admin_api/v1/delete_vehicle/`+row.id,{headers:{
                            //   'auth-token':localStorage.getItem('auth-token'),
                            //   }})
                              this.axios({
                                method: 'delete',
                                url: `${values.BASE_URL}/admin_api/v1/promocode/`+row.id,
                                headers: {'auth-token':localStorage.getItem('auth-token')}
                                })
                              .then(res=>{
                                  this.getData()
                                  this.$snotify.success('REGION Delete','Success')
                              })
                              .catch(e=>{
                                this.$snotify.error('Something wend wrong','Error')
                                  console.log(e)
                              })
                          },
                          bold : true
                      },
                      {
                          text : "No",
                          action : toast => {
                              this.$snotify.remove(toast.id)
                          },
                          bold : true
                      }
                      
                  ]
              })
            },
            approve(row){
          this.$snotify.clear()
          this.$snotify.confirm("You want to Approve This Driver","Are you sure? to approve", {
                  showProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  buttons:[
                      {
                          text : "Yes",
                          action : toast => {
                              this.$snotify.remove(toast.id)
                              console.log(row.id)
                              this.axios({
                                method: 'put',
                                url: `${values.BASE_URL}/admin_api/v1/promocode_actice/`+row.id,
                                headers: {'auth-token':localStorage.getItem('auth-token')}
                                })
                            //   this.axios.put(values.BASE_URL+'/admin_api/v1/driver_approve/'+row.id)
                              .then(res=>{
                                        this.getData()
                                        this.$snotify.success('REGION ON','Success')
                                    })
                                    .catch(e=>{
                                        this.$snotify.error('Something wend wrong','Error')
                                        console.log(e)
                                    })
                          },
                          bold : true
                      },
                      {
                          text : "No",
                          action : toast => {
                              this.$snotify.remove(toast.id)
                          },
                          bold : true
                      }
                      
                  ]
              })
            },
        block(row){
          this.$snotify.clear()
          this.$snotify.confirm("You want to Block This Driver","Are you sure? to Block", {
                  showProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  buttons:[
                      {
                          text : "Yes",
                          action : toast => {
                              this.$snotify.remove(toast.id)
                              console.log(row.id)
                              this.axios({
                                method: 'put',
                                url: `${values.BASE_URL}/admin_api/v1/promocode_deactice/`+row.id,
                                headers: {'auth-token':localStorage.getItem('auth-token')}
                                })
                            //   this.axios.put(`${values.BASE_URL}/admin_api/v1/driver_ban/`+row.id,{
                            //       headers:{
                            //         'auth-token':localStorage.getItem('auth-token'),
                            //      }})
                                    .then(res=>{
                                        this.getData()
                                        this.$snotify.success('REGION OFF','Success')
                                    })
                                    .catch(e=>{
                                        this.$snotify.error('Something wend wrong','Error')
                                        console.log(e)
                                    })
                          },
                          bold : true
                      },
                      {
                          text : "No",
                          action : toast => {
                              this.$snotify.remove(toast.id)
                          },
                          bold : true
                      }
                      
                  ]
              })
            },

            edit(row){
              console.log(row)
              this.editMode = true
              this.modalTitle = "Edit " +row.promoCode+" data"
              this.file = null,
              this.form.reset()
                this.form.clear()
                this.form.fill(row)

              this.$refs['modal'].show()

            },
            update(){

              this.form.put(`${values.BASE_URL}/admin_api/v1/promocode/`+this.form.id,{
                headers :{
                  'auth-token':localStorage.getItem('auth-token'),
                }
              }).then(res=>{
                if(this.form.successful){
                    this.$refs['modal'].hide()
                    this.getData()
                    this.$snotify.success('Region Update Successfully','Success')
                }else{
                  this.$snotify.error('Something went wrong..try again','Error')
                }
              }).catch(e=>{
                 this.$snotify.error('Something went wrong..try again','Error')
                    console.log(e)
              })
            },
            show(row){
              this.$refs['my-modal2'].show()
              this.modalTitle = "Show Details for" +row.promoCode;
              this.showDetais = row
            }








    },
    
  };

</script>

<style></style>
