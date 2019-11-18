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
                                
                                 <b-button @click.prevent="create" class="btn btn-success">ADD NEW REGION</b-button>
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
                                    <th>Region Name</th>
                                    <th>Car Type</th>
                                    <th>Base Price</th>
                                    <th>Kilometre Rate</th>
                                    <th>Minute Rate</th>
                                    <th>Range</th>
                                    <th>Location</th>
                                    <th>Action</th>
                                  </template>

                                  <template slot-scope="{row}">
                                    
                                    <td class="budget">
                                      {{ row.regionName}}
                                    </td>
                                    <td>
                                      {{ row.carType }}
                                    </td>
                                    <td>
                                      {{ row.basePrice }}
                                    </td>
                                    <td>
                                      {{ row.kilometerRat }}
                                    </td>
                                    <td>
                                      {{ row.minuteRate }}
                                    </td>
                                    <td>
                                      {{ row.range }}
                                    </td>
                                    <td>
                                      {{ row.location }}
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
                    <b-form-group label="Enter Region Name" >
                    <b-form-input v-model="form.regionName" type="text" required placeholder="Enter Name" ></b-form-input>
                  </b-form-group>

                  <b-form-group label="Enter Vehicle Type" >
                       <b-form-input v-model="form.carType" ></b-form-input>
                  </b-form-group>

                   <b-form-group label="Enter Base Price" >
                    <b-form-input v-model="form.basePrice" type="text" required placeholder="Enter Name" ></b-form-input>
                  </b-form-group>

                  <b-form-group label="Enter Kilometer Rate" >
                    <b-form-input v-model="form.kilometerRat" type="text" required placeholder="Enter Name" ></b-form-input>
                  </b-form-group>
                  <b-form-group label="Enter Minute Rate" >
                    <b-form-input v-model="form.minuteRate" type="text" required placeholder="Enter Name" ></b-form-input>
                  </b-form-group>
                  <b-form-group label="Enter Range" >
                    <b-form-input v-model="form.range" type="text" required placeholder="Enter Name" ></b-form-input>
                  </b-form-group>
                  <b-form-group label="Enter Location" >
                    <b-form-input v-model="form.location" type="text" required placeholder="Enter Name" ></b-form-input>
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
                <b-list-group-item><strong>Region Name</strong> : {{ showDetais.regionName }}</b-list-group-item>
                <b-list-group-item><strong>Car Type</strong> : {{ showDetais.carType }}</b-list-group-item>
                <b-list-group-item><strong>Base Price</strong> : {{ showDetais.basePrice }}</b-list-group-item>
                <b-list-group-item><strong>Kilometre Rate</strong> : {{ showDetais.kilometerRat }}</b-list-group-item>
                <b-list-group-item><strong>Minute Rate</strong> : {{ showDetais.minuteRate }}</b-list-group-item>
                <b-list-group-item><strong>Range</strong> : {{ showDetais.range }}</b-list-group-item>
                <b-list-group-item><strong>Location</strong> : {{ showDetais.location }}</b-list-group-item>
                <b-list-group-item><strong>Status</strong> : {{ showDetais.status }}</b-list-group-item>
                <b-list-group-item><strong>UPDATED AT</strong> : {{ showDetais.updatedAt }}</b-list-group-item>
               
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
        modalTitle : '',
        showDetais : {},
        showMode : false,
        selected: null,
        form : new Form({
            id : '',
            regionName : '',
            carType : '',
            basePrice : '',
            kilometerRat : '',
            minuteRate : '',
            range : '',
            location :''
          }),
      }
    },
    mounted(){
      if(!localStorage.getItem('auth-token')){
            this.$router.replace(this.$route.query.redirect || '/login')
        }
      console.log('employee mounted')
      this.getData();
      this.getVehicle()
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
        console.log('cl')
      },getData(){
        this.axios.get(`${values.BASE_URL}/admin_api/v1/all_region`,
        {headers:{'auth-token':localStorage.getItem('auth-token')}})
          .then(res=>{
            console.log(res.data.regionData)
            this.tableData = res.data.regionData
          }).catch(e=>{
            console.log(e)
          })
      },
    //   getVehicle(){
    //       this.axios.get(`${values.BASE_URL}/admin_api/v1/get_all_vehicle_type`,
    //         {headers:{'auth-token':localStorage.getItem('auth-token')}})
    //         .then(res=>{
    //             console.log(res.data.AllVehicleData)
    //             this.options = res.data.AllVehicleData
    //         }).catch(e=>{
    //             console.log(e)
    //         })
    //   },
      storeData(){
        //   console.log(this.form)
        this.form.post(`${values.BASE_URL}/admin_api/v1/add_region`,{
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
                                url: `${values.BASE_URL}/admin_api/v1/delete_region/`+row.id,
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
                                url: `${values.BASE_URL}/admin_api/v1/region_actice/`+row.id,
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
                                url: `${values.BASE_URL}/admin_api/v1/region_deactice/`+row.id,
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
              this.modalTitle = "Edit " +row.name+" data"
              this.file = null,
              this.form.reset()
                this.form.clear()
                this.form.fill(row)

              this.$refs['modal'].show()

            },
            update(){

              this.form.put(`${values.BASE_URL}/admin_api/v1/region/`+this.form.id,{
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
              this.modalTitle = "Show Details for" +row.name;
              this.showDetais = row
            }








    },
    
  };

</script>

<style></style>
