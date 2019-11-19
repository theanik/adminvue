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
                                
                                 <b-button @click.prevent="create" class="btn btn-success">SEND NEW NOTIFICATION</b-button>
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
                                   <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Gander</th>
                                    <th>Action</th>
                                  </template>

                                  <template slot-scope="{row}">
                                    
                                    <td class="budget">
                                      {{ row.firstName}}
                                    </td>
                                    <td class="budget">
                                      {{ row.phone}}
                                    </td>
                                    <td class="budget">
                                      {{ row.email}}
                                    </td>
                                    <td>
                                      {{ row.gander }}
                                    </td>
                                  

                                    <td class="text-right">
                                      <b-button @click.prevent="show(row)" class="btn btn-info btn-sm"><i class="fa fa-eye"></i></b-button>
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

                  <b-form-group label="Enter Title" >
                    <b-form-input v-model="title" type="text" required placeholder="Enter Title" ></b-form-input>
                  </b-form-group>

                   <b-form-group label="Enter Body" >
                       <b-form-textarea
                            id="textarea-small"
                            size="sm"
                            placeholder="Enter Body"
                            v-model="body"
                        ></b-form-textarea>
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
                <b-list-group-item><strong>TYPE</strong> : {{ showDetais.vehicleType }}</b-list-group-item>
                <b-list-group-item><strong>SEAT'S</strong> : {{ showDetais.maxSit }}</b-list-group-item>
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
            id : '',
            title : '',
            body : '',
        editMode : false,
        tableData: [],
        modalTitle : '',
        showDetais : {},
        showMode : false,
      }
    },
    mounted(){
      if(!localStorage.getItem('auth-token')){
            this.$router.replace(this.$route.query.redirect || '/login')
        }
      console.log('employee mounted')
      this.getData();
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
        this.modalTitle = "SEND NOTIFICATION"
        this.$refs['modal'].show()
        console.log('cl')
      },getData(){
        this.axios.get(`${values.BASE_URL}/admin_api/v1/all_user`,
        {headers:{'auth-token':localStorage.getItem('auth-token')}})
          .then(res=>{
            console.log(res.data)
            this.tableData = res.data
          }).catch(e=>{
            console.log(e)
          })
      },
      storeData(){
        for(var i =0;i<this.tableData.length ;i++){
              console.log(this.tableData[i].deviceId)
              this.$snotify.success('Notification Send Successfully','Success')
              this.axios.post(`${values.BASE_URL}/api/v1/pushmessage`,{
                  title:this.title,
                  body:this.body,
                  token:this.tableData[i].deviceId
              }).then(res=>{
                  this.$refs['modal'].hide()
                  console.log('done')
                 
              }).catch(e=>{
                  console.log(e)
              })
          }

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
                              this.axios.delete(`${values.BASE_URL}/admin_api/v1/delete_vehicle/`+row.id,{headers:{
                              'auth-token':localStorage.getItem('auth-token'),
                              }})
                              .then(res=>{
                                  this.getData()
                                  this.$snotify.success('Vehicle Delete','Success')
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
                                url: `${values.BASE_URL}/admin_api/v1/vehicle_actice/`+row.id,
                                headers: {'auth-token':localStorage.getItem('auth-token')}
                                })
                            //   this.axios.put(values.BASE_URL+'/admin_api/v1/driver_approve/'+row.id)
                              .then(res=>{
                                        this.getData()
                                        this.$snotify.success('Vechile On','Success')
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
                                url: `${values.BASE_URL}/admin_api/v1/vehicle_deactice/`+row.id,
                                headers: {'auth-token':localStorage.getItem('auth-token')}
                                })
                            //   this.axios.put(`${values.BASE_URL}/admin_api/v1/driver_ban/`+row.id,{
                            //       headers:{
                            //         'auth-token':localStorage.getItem('auth-token'),
                            //      }})
                                    .then(res=>{
                                        this.getData()
                                        this.$snotify.success('VEHICLE OFF','Success')
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
            show(row){
              this.$refs['my-modal2'].show()
              this.modalTitle = "Show Details for" +row.name;
              this.showDetais = row
            }








    },
    
  };

</script>

<style></style>
