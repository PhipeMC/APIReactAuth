using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using APIReactAuth.Data;
using APIReactAuth.Models;
using Microsoft.AspNetCore.Authorization;

namespace InventoryWebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MovementsController : ControllerBase
    {
        private readonly NorthwindContext _context;

        public MovementsController(NorthwindContext context)
        {
            _context = context;
        }

        // GET: api/Movements
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movement>>> GetMovements()
        {
            if (_context.Movements == null)
            {
                return NotFound();
            }
            return await _context.Movements.OrderByDescending(x => x.MovementId).Take(20).ToListAsync();
        }

        // GET: api/Movements/5
        [Authorize(Policy = "AllRole")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Movement>> GetMovement(int id)
        {
            if (_context.Movements == null)
            {
                return NotFound();
            }
            var movement = await _context.Movements.FindAsync(id);

            if (movement == null)
            {
                return NotFound();
            }

            return movement;
        }

        // PUT: api/Movements/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Policy = "AllRole")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovement(int id, Movement movement)
        {
            if (id != movement.MovementId)
            {
                return BadRequest();
            }

            _context.Entry(movement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovementExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Movements
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Policy = "AllRole")]
        [HttpPost]
        public async Task<ActionResult<Movement>> PostMovement(Movement movement, int productId, int quantity)
        {
            if (_context.Movements != null)
            {
                if (movement.Type == "VENTA" || movement.Type == "TRASPASO")
                {

                    if (movement.OriginWarehouseId > 0)
                    {
                        Warehouseproduct wp = await _context.Warehouseproducts.FindAsync(movement.OriginWarehouseId, productId);

                        if (wp == null)
                        {
                            //404 no se encontro el warehouse
                            return NotFound();
                        }

                        if (wp.UnitsInStock >= quantity)
                        {
                            if (movement.TargetWarehouseId != null)
                            {
                                Warehouseproduct wpt = await _context.Warehouseproducts.FindAsync(movement.TargetWarehouseId, productId);
                                if (wpt != null)
                                {
                                    wp.UnitsInStock -= (short)quantity;
                                    _context.Entry(wp).State = EntityState.Modified;
                                    wpt.UnitsInStock += (short)quantity;
                                    _context.Entry(wpt).State = EntityState.Modified;
                                }
                                else
                                {
                                    //404 no se encontró el destino marcado
                                    return NotFound();
                                }
                            }
                            else
                            {
                                wp.UnitsInStock -= (short)quantity;
                                _context.Entry(wp).State = EntityState.Modified;
                            }
                        }
                        else
                        {
                            //400 No se pudo realizar la operación, no da la cantidad
                            return BadRequest();
                        }

                    }

                }
                else if (movement.Type == "COMPRA" || movement.Type == "AJUSTE")
                {

                    if (movement.OriginWarehouseId > 0)
                    {
                        Warehouseproduct wp = await _context.Warehouseproducts.FindAsync(movement.OriginWarehouseId, productId);

                        if (wp == null)
                        {
                            //404 no se encontro el warehouse
                            return NotFound();
                        }

                        if (movement.TargetWarehouseId != null)
                        {
                            Warehouseproduct wpt = await _context.Warehouseproducts.FindAsync(movement.TargetWarehouseId, productId);
                            if (wpt.UnitsInStock >= quantity)
                            {
                                wpt.UnitsInStock -= (short)quantity;
                                _context.Entry(wpt).State = EntityState.Modified;
                                wp.UnitsInStock += (short)quantity;
                                _context.Entry(wp).State = EntityState.Modified;
                            }
                            else
                            {
                                //404 no se encontró el destino marcado
                                return NotFound();
                            }
                        }
                        else
                        {
                            wp.UnitsInStock += (short)quantity;
                            _context.Entry(wp).State = EntityState.Modified;
                        }

                    }

                }
                _context.Movements.Add(movement);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetMovement", new { id = movement.MovementId }, movement);
            }

            return Problem("Entity set 'NorthwindContext.Movements'  is null.");
        }

        // DELETE: api/Movements/5
        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovement(int id)
        {
            if (_context.Movements == null)
            {
                return NotFound();
            }
            var movement = await _context.Movements.FindAsync(id);
            if (movement == null)
            {
                return NotFound();
            }

            _context.Movements.Remove(movement);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MovementExists(int id)
        {
            return (_context.Movements?.Any(e => e.MovementId == id)).GetValueOrDefault();
        }
    }
}