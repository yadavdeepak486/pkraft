import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
// import { compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation } from 'app/mock-api/common/navigation/data';
import { defaultNavigation,clientNavigation } from 'app/mock-api/common/navigation/data';
import { CommonService } from 'app/common.service';

@Injectable({
    providedIn: 'root'
})
export class NavigationMockApi
{
    // private readonly _compactNavigation: FuseNavigationItem[] = compactNavigation;
    private _defaultNavigation: FuseNavigationItem[] = defaultNavigation;
    // private readonly _futuristicNavigation: FuseNavigationItem[] = futuristicNavigation;
    // private readonly _horizontalNavigation: FuseNavigationItem[] = horizontalNavigation;

    private readonly _clientNavigation: FuseNavigationItem[] = clientNavigation;

    Detail;


    /**
     * Constructor
     */
    constructor(
        private _fuseMockApiService: FuseMockApiService,
        private _commonService: CommonService,

        )
    {
        this._commonService.User().subscribe((res:any)=>{
            console.log(res)
            this.Detail = res.data
            // this._changeDetectorRef.markForCheck();

        })
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void
    {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/common/navigation')
            .reply(() => {

                // if(this.Detail?.role == 'client'){
                //     console.log("User is client")
                //     this._defaultNavigation =  this._clientNavigation
                // }else if(this.Detail?.role == 'admin'){
                //     console.log("User is admin")
                // }else{
                //     console.log(this.Detail?.role)
                // }












                

                // Fill compact navigation children using the default navigation
                // this._compactNavigation.forEach((compactNavItem) => {
                //     this._defaultNavigation.forEach((defaultNavItem) => {
                //         if ( defaultNavItem.id === compactNavItem.id )
                //         {
                //             compactNavItem.children = cloneDeep(defaultNavItem.children);
                //         }
                //     });
                // });

                // Fill futuristic navigation children using the default navigation
                // this._futuristicNavigation.forEach((futuristicNavItem) => {
                //     this._defaultNavigation.forEach((defaultNavItem) => {
                //         if ( defaultNavItem.id === futuristicNavItem.id )
                //         {
                //             futuristicNavItem.children = cloneDeep(defaultNavItem.children);
                //         }
                //     });
                // });

                // Fill horizontal navigation children using the default navigation
                // this._horizontalNavigation.forEach((horizontalNavItem) => {
                //     this._defaultNavigation.forEach((defaultNavItem) => {
                //         if ( defaultNavItem.id === horizontalNavItem.id )
                //         {
                //             horizontalNavItem.children = cloneDeep(defaultNavItem.children);
                //         }
                //     });
                // });

                // Return the response
                return [
                    200,
                    {
                        // compact   : cloneDeep(this._compactNavigation),
                        default   : cloneDeep(this._defaultNavigation),
                        // futuristic: cloneDeep(this._futuristicNavigation),
                        // horizontal: cloneDeep(this._horizontalNavigation)
                    }
                ];
            });
    }
}
