<script>
	import { onMount } from 'svelte';
	import DeclaredPackage from './declared-package.svelte';
	import ItemInput from './item-input.svelte';

	/** @type {any} */ export let orders;
	let isFetching = false;
	let fetchError = false;

	const getAndSetPackageImages = async () => {
		isFetching = true;
		fetchError = false;
		try {
			const response = await fetch('/api/get-package-images', { method: 'GET' });
			/** @type {import('../types').pickupDataType[]}  */ const data = await response.json();
			for (const order of orders) {
				const pickupData = data.find(({ name, orderID }) => {
					return (
						order.SenderName.toLowerCase().includes(name.toLowerCase()) || orderID == order.OrderID
					);
				});
				order.images = pickupData ? pickupData.images : [];
			}
		} catch (err) {
			fetchError = true;
		} finally {
			isFetching = false;
		}
	};

	// onMount(async () => {
	// 	await getAndSetPackageImages();
	// });
</script>

<div>
	<div class="flex items-center justify-between mb-0.5">
		<div class="flex items-center gap-x-10">
			<p class="font-semibold">Daily Packages to Pack ({orders.length})</p>
			<button
				class="border rounded-md bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-wait text-white p-2"
				on:click={getAndSetPackageImages}
				disabled={isFetching}>Fetch Images</button
			>
		</div>
	</div>
	<div class="border-t-2 border-gray-500">
		<table class="text-sm table-auto w-full">
			<thead class="">
				<tr>
					<th>S/N</th>
					<th>PackageID</th>
					<th>Packing</th>
					<th>Sender</th>
					<th>RecName</th>
					<th>RecCountry</th>
					<th>DeclaredValue</th>
					<th>Insured</th>
					<th>OrderRemarks</th>
					<th>Tracking Num</th>
				</tr>
			</thead>
			<tbody>
				{#each orders as order, i (order.PackageID)}
					<tr>
						<td class="text-center">{i + 1}</td>
						<td class="text-center">{order.PackageID}</td>
						<td class="text-center">
							{#if orders.NeedsFragilePacking}
								<span class="rounded-md bg-gray-500 text-white font-medium py-1 px-2"
									>Frag Pack</span
								>
							{:else}
								<span class="rounded-md bg-gray-500 text-white font-medium py-1 px-2">Pack</span>
							{/if}
						</td>
						<td>{order.SenderName}</td>
						<td>{order.RecName}</td>
						<td>{order.RecCountry}</td>
						<td>${order.ItemTotalPrice}</td>
						<td class="text-center">{order.IsInsured ? '✔️' : ''}</td>
						<td style="min-width:260px;max-width:360px">{order.CustomerRemarks}</td>
						<td class="text-center">{order.TrackingNo ?? ''}</td>
					</tr>
					<tr>
						<td class="" colspan="10">
							<div class="">
								{#if !order.hasOwnProperty('images')}
									<p>
										{fetchError
											? 'Error occured while fetching images'
											: isFetching
											? `Please wait, now fetching images... `
											: 'Press Fetch Images Button to get images'}
									</p>
								{:else if order.images.length === 0}
									<p>No Image Found</p>
								{:else}
									<div class="max-w-full overflow-auto image-grid">
										{#each order.images as image}
											<div class="w-60 h-[15.5rem]">
												<img
													class="object-contain w-60 h-60"
													src={image}
													alt="request timed-out, if situation persists, please let the admin know"
													loading="lazy"
												/>
											</div>
										{/each}
									</div>
								{/if}
							</div>
						</td>
					</tr>
                    <td colspan="10">
                        <div class="flex"> 
                            
                        </div>
                    </td>
					<tr />
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- 
                <tr class="package-contents-container">
                    <td colspan="100%">
                        <div class="my-2 package-contents container-plus ml-0">
                            <h5>
                                @package.PackageID
                                <a class="badge badge-secondary" asp-controller="ShipmentDetail" asp-action="ShipmentDetailIndex" 
                                asp-route-shippingID=@shipment.ShippingID><i class="fa-solid fa-share"></i> Go to shipment</a>
                            </h5>
                            <div class="package-declared-dimensions my-3">
                                @{ decimal declaredVolWeight = Math.Round(Convert.ToDecimal(package.FormLength) * Convert.ToDecimal(package.FormWidth) * Convert.ToDecimal(package.FormHeight) / 5000M, 2); }
                                <span class="font-weight-bold">Declared Vol. Weight: @declaredVolWeight KG (@package.FormLength cm x @package.FormWidth cm x @package.FormHeight cm)</span><br>
                                <span class="font-weight-bold">Declared Act. Weight: @package.FormWeight KG</span>
                            </div>
                            <form asp-controller="DailyPackages">
                                <table id="viewItem" class="table table-striped">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>S/N</th>
                                            <th>Description</th>
                                            <th>Category</th>
                                            <th>Qty</th>
                                            <th>Weight (kg/pc)</th>
                                            <th>Total (kg)</th>
                                            <th>Price ($/pc)</th>
                                            <th>Total ($)</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    @{int itemCount = 0;}
                                    @foreach (var item in package.Items)
                                    {
                                        itemCount += 1;
                                        <tr>
                                            <td>@itemCount</td>
                                            <td>
                                                <input style="display:none" class="form-control" type="text" id="itemID" name="itemID" size="30" value="@item.ItemID" required>
                                                <input class="form-control" type="text" id="Description" name="Description" size="60" value="@item.Description" required>
                                            </td>
                                            <td>
                                                @{
                                                    var itemCategoryList = (List<SelectListItem>) ViewData["ItemCategoryList"];
                                                    foreach (var category in itemCategoryList) {
                                                        category.Selected = category.Value == item.Category;
                                                    }
                                                }
                                                <select class="form-control" for="Category" name="Category" asp-items=@itemCategoryList id="ItemCategory"></select>
                                            <td>
                                                <input class="form-control" type="number" min="1" id="Quantity" name="Quantity" size="2" value="@item.Quantity" required>
                                            </td>
                                            <td>
                                                <input class="form-control" type="number" min="0.01" step="0.01" id="UnitWeight" name="UnitWeight" size="3" value="@item.UnitWeight" required>
                                            </td>
                                            <td>
                                                <input class="form-control" type="text" id="TotalWeight" name="TotalWeight" size="3" value=@(item.UnitWeight*item.Quantity) disabled>
                                            </td>
                                            <td>
                                                <input class="form-control" type="number" min="0.01" step="0.01" id="UnitPrice" name="UnitPrice" size="3" value="@item.UnitPrice" required>
                                            </td>
                                            <td>
                                                <input class="form-control" type="text" id="TotalPrice" name="TotalPrice" size="3" value=@item.TotalPrice disabled>
                                            </td>
                                            <td>
                                                <button asp-action="DeleteItem" asp-route-itemIDForDelete=@item.ItemID asp-route-shippingID=@shipment.ShippingID 
                                                onclick="return confirm('Are you sure you want to remove item?')" 
                                                type="submit" value="remove" class="btn btn-danger" title="Remove item"><i class="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    }
                                    </tbody>
                                </table>
                                <button asp-action="AddItem" asp-route-packageID=@package.PackageID asp-route-shippingID=@shipment.ShippingID 
                                type="submit" value="save" class="btn btn-success">
                                    <i class="fa-solid fa-plus"></i> Add Item
                                </button>
                                <button asp-action="UpdateCommodities" asp-route-shippingID=@shipment.ShippingID type="s    ubmit" 
                                onclick="return confirm('Do you confirm to save the changes?')" 
                                value="save" class="btn btn-primary" title="Save changes to package items">
                                    <i class="fa-solid fa-floppy-disk"></i> Save Items
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                }
            }
        }
    } -->
<style>
	.image-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, 15rem);
		gap: 1.5rem;
	}

	th,
	td {
		border-width: 1px;
		padding: 0.45rem 0.5rem;
		border-color: rgb(107 114 128);
	}
</style>
